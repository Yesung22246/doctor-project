// import các controller 
const userRoute = require("../routes/route/userRoute")
const doctorController = require("../controllers/DoctorController");
function router(app){ 
    app.use("/api/users",  userRoute)
    app.use("/api/doctors",  require("../routes/route/doctorRoute"))
    app.get("/api/doctors/seed", doctorController.seedDoctors);
    app.use("/api/bookings",  require("../routes/route/bookingRoute"))
    // app.use("/haha",  controller)
    // app.use("/haha",  controller)
    // app.use("/haha",  controller)
    // app.use("/haha",  controller)
    // app.use("/haha",  controller)
    // app.use("/haha",  controller)
}

module.exports = router