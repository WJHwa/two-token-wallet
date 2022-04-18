const db = require("../db");
const crypto = require("crypto");
const auth = require("../js/middlewares");
const jwt = require("jsonwebtoken");
const salt = require("../js/secret");

let refreshTokens = [];

const ctrl = {
  login: (req, res) => {
    const password = req.body.password;
    const id = req.body.id;
    db.query(
      "SELECT * FROM Wallet.user WHERE user_id = ?;",
      [id],
      (err, results) => {
        if (results.length === 1) {
          const hashedPw = crypto
            .pbkdf2Sync(password, results[0].user_salt, 10000, 64, "sha256")
            .toString("hex");
          const PW = results[0].user_password;
          if (hashedPw === PW) {
            let accessToken = auth.generateAccessToken(
              results[0].user_id + results[0].id
            );
            let refreshToken = auth.generateRefreshToken(
              results[0].user_id + results[0].id
            );

            db.query(
              "UPDATE Wallet.user SET access_token =?, refresh_token = ? WHERE user_id = ?",
              [accessToken, refreshToken, id],
              (err, results) => {
                if (!err) {
                  refreshTokens.push(refreshToken);
                  res.json({ accessToken, refreshToken });
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            res.send("비밀번호를 잘못 입력하셨습니다.");
          }
        } else {
          res.send("아이디가 존재하지 않습니다.");
        }
      }
    );
  },
  register: (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;
    const hashedPw = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha256")
      .toString("hex");

    db.query("SELECT * FROM Wallet.user WHERE user_id=?", id, (err, result) => {
      if (result.length === 0) {
        db.query(
          "INSERT INTO Wallet.user(user_name,user_password,user_address,user_salt,user_phone,user_id) VALUES(?,?,?,?,?,?);",
          [name, hashedPw, address, salt, phone, id],
          (err, results) => {
            if (!err) {
              res.send(results);
            } else {
              console.log(err);
            }
          }
        );
      } else {
        res.send("이미 가입하신 아이디가 있습니다.");
      }
    });
  },
  getAddress: async (req, res) => {
    let authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    db.query(
      "SELECT * FROM Wallet.user WHERE access_token = ?;",
      token,
      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).json({
              address: result[0].user_address,
              name: result[0].user_name,
            });
          } else {
            res.status(400).send("주소가 등록되지 않았습니다.");
          }
        } else {
          res.status(404).send("주소를 가져오는중에 오류가 발생했습니다.");
        }
      }
    );
  },
  getHistory: (req, res) => {
    let token = req.token;

    db.query(
      "SELECT * FROM Wallet.user WHERE access_token = ?;",
      token,
      (err, result) => {
        if (!err) {
          const name = result[0].user_name;
          db.query(
            "SELECT * FROM Wallet.receipt WHERE user_name = ?",
            name,
            (err, result) => {
              if (result) {
                res.status(200).send({ result: result });
              }
            }
          );
        } else {
          console.log(err);
        }
      }
    );
  },
  getSend: (req, res) => {
    let hash = req.body.hash;
    let gas = req.body.gas;
    let to = req.body.to;
    let name = req.body.name;

    db.query(
      "INSERT INTO Wallet.receipt(Hash,gas,to_Hash,user_name) VALUES(?,?,?,?);",
      [hash, gas, to, name],
      (err, result) => {
        if (result.serverStatus === 2) {
          res.status(200);
        } else {
          res.status(401).send("보내는중 오류발생");
        }
      }
    );
  },
  logout: (req, res) => {
    let authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    db.query(
      "SELECT * FROM Wallet.user WHERE access_token = ?",
      token,
      (err, result) => {
        if (!err) {
          refreshTokens = refreshTokens.filter(
            (token) => token !== result[0].refresh_token
          );
          res.status(200).json("로그아웃 하셨습니다.");
        }
      }
    );
  },
  refresh: (req, res) => {
    let authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    db.query(
      "SELECT * FROM Wallet.user WHERE access_token = ?",
      token,
      (err, result) => {
        if (!err) {
          let refreshToken = result[0].refresh_token;
          if (!refreshToken)
            return res.status(400).json("당신은 인증되지 않았습니다!");

          if (!refreshTokens.includes(refreshToken)) {
            return res.status(401).json("refreshToken이 유효하지 않습니다.");
          }

          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error) => {
              if (!error) {
                const newAccessToken = auth.generateAccessToken(
                  result[0].user_id + result[0].id
                );
                const newRefreshToken = auth.generateRefreshToken(
                  result[0].user_id + result[0].id
                );
                refreshTokens.push(newRefreshToken);
                db.query(
                  "UPDATE Wallet.user SET refresh_token = ?,access_token = ? WHERE user_id = ?;",
                  [newRefreshToken, newAccessToken, result[0].user_id],
                  (err, result) => {
                    if (!err) {
                      res.status(200).json({
                        accessToken: newAccessToken,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send(false);
        }
      }
    );
  },
  iddelete: (req, res) => {
    let authHeader = req.headers.authentization;
    let token = authHeader.slice("6", "153");
    db.query(
      "DELETE FROM Wallet.user WHERE access_token = ?",
      token,
      (err, result) => {
        if (!err) {
          if (result.affectedRows === 1) {
            res.status(204).send("지갑 삭제 완료되었습니다.");
          } else {
            res.status(401).send("지갑삭제중 오류");
          }
        } else {
          res.status(401).send("지갑삭제중 오류");
        }
      }
    );
  },
};

module.exports = ctrl;
