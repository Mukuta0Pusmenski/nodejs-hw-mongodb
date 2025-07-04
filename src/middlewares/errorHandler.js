// // const errorHandler = (err, req, res, next) => {
// //   const { status = 500, message = "Something went wrong" } = err;
// //   res.status(status).json({
// //     status,
// //     message,
// //     data: err.message || null,
// //   });
// // };

// // export default errorHandler;

// // //))
// export default (err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({ status, message: err.message });
// };
export default (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ status, message: err.message });
};
