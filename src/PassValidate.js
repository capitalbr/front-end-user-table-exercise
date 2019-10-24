// has digt || uppercase then it's valid
// has length of 8
// how many checks have to pass
// 1 or 2 tests make modular version use lodash


export const isValidPassword = (pass, validations = [], amtToPass = validations.length) => {
 if (!Array.isArray(validations)) throw "validations is not an array";
 
 if (typeof pass !== "string") return false;
 let isValid = true, count = 0;
  
 validations.forEach(check => {
  if (!check(pass)) {
    return isValid = false;
  } else {
    count += 1
  }
 })

 return isValid || amtToPass - count <= 0;
}

export function hasNum(pass) {
  for (let i = 0; i < pass.length; i++){
    if (/^\d+$/.test(pass[i])) return true;
  }
  return false;
}

export function hasMinLength(pass) {
  return pass.length >= 8;
}

export function hasUpperCase(pass) {
  for (let i = 0; i < pass.length; i++){
    if (pass[i] === pass[i].toUpperCase() 
      && /^[A-Z]$/i.test(pass[i])) return true;
  }
  return false;
}

