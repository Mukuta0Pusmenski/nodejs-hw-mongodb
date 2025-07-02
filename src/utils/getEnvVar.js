// // const getEnvVar = (key) => {
// //   const value = process.env[key];
// //   if (!value) {
// //     throw new Error(`Missing environment variable: ${key}`);
// //   }
// //   return value;
// // };

// // export default getEnvVar;

// export default function getEnvVar(name) {
//   const val = process.env[name];
//   if (!val) {
//     throw new Error(`Missing environment variable: ${name}`);
//   }
//   return val;
// }

export default function getEnvVar(name) {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return val;
}
