module.exports = app => {
 app.post("/auth/sign-up", (req, res) => {
   console.log("sign-up")
 });

 app.post("/auth/sign-in", (req, res) => {
   console.log("sign-in")
   res.json({test:"test"});
 });

 app.post("/auth/sign-out", (req, res) => {
   console.log("sign-out")
 });
};
