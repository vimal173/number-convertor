let type1 = document.getElementById("type1");
let type2 = document.getElementById("type2");
let error = document.getElementById("error_txt_type");
let value1 = document.getElementById("v1");
let value2 = document.getElementById("v2");
let labelv1 = document.getElementById("v1l");
let labelv2 = document.getElementById("v2l");
const err_txt_1 = document.createElement("p");
let label_p_1 = document.createElement("p");
let label_p_2 = document.createElement("p");
const convert = document.getElementById("btn");
let clrbx = document.createElement("div");
let clrp = document.createElement("p");
let parentofclrbx = document.getElementById("hex");
parentofclrbx.append(clrp);
parentofclrbx.append(clrbx);
let val_err = document.getElementById("value_error");
val_err.style.display = "none";
let verr_p = document.createElement("p");
val_err.append(verr_p);
style_err(verr_p);
const hex_pattern =
  /[!|@|#|$|%|^|&|*|\(|\)|_|\-|;|:|'|"|\?|\\|\/|\<|\>|+|=|~|`|\.|,]|[g-z]/gi;
const octal_pattern =
  /[!|@|#|$|%|^|&|*|\(|\)|_|\-|;|:|'|"|\?|\\|\/|\<|\>|+|=|~|`|\.|,]|[a-z]|[8-9]/gi;
const decimal_pattern =
  /[!|@|#|$|%|^|&|*|\(|\)|_|\-|;|:|'|"|\?|\\|\/|\<|\>|+|=|~|`|\.|,]|[a-z]/gi;
const binary_pattern =
  /[!|@|#|$|%|^|&|*|\(|\)|_|\-|;|:|'|"|\?|\\|\/|\<|\>|+|=|~|`|\.|,]|[a-z]|[2-9]/gi;
function disp_val_err(val, typ) {
  let err = 0;
  switch (typ) {
    case "d":
      for (let n of val) {
        if (decimal_pattern.test(n)) err += 1;
      }
      if (err > 0) {
        val_err.style.display = "block";
        return 1;
      } else if (Number(val) > 4294967295) {
        val_err.style.display = "block";
        return 2;
      } else {
        val_err.style.display = "none";
        return 0;
      }
    case "b":
      for (let n of val) {
        if (binary_pattern.test(n)) err += 1;
      }
      if (err > 0) {
        val_err.style.display = "block";
        return 1;
      } else {
        val_err.style.display = "none";
        return 0;
      }
    case "o":
      for (let n of val) {
        if (octal_pattern.test(n)) err += 1;
      }
      if (err > 0) {
        val_err.style.display = "block";
        return 1;
      } else {
        val_err.style.display = "none";
        return 0;
      }
    case "h":
      for (let n of val) {
        if (hex_pattern.test(n)) err += 1;
      }
      if (err > 0) {
        val_err.style.display = "block";
        return 1;
      } else {
        val_err.style.display = "none";
        return 0;
      }
  }
}
function style_err(element) {
  element.style.color = "red";
  element.style.fontSize = "12.5px";
  element.style.textAlign = "left";
}
function isequal() {
  if (type1.value === type2.value) {
    error.style.display = "block";
    error.append(err_txt_1);
  } else error.style.display = "none";
}
function label_name() {
  label_p_1.innerText = `enter ${type1.value} value`;
  label_p_2.innerText = `the ${type2.value} equivalent`;
}
style_err(err_txt_1);
err_txt_1.innerText = "cannot perform convertion between same type";
label_p_1.innerText = `enter ${type1.value} value`;
label_p_2.innerText = `the ${type2.value} equivalent`;
labelv1.append(label_p_1);
labelv2.append(label_p_2);
type1.addEventListener("change", (e) => {
  isequal();
  label_name();
});
type2.addEventListener("change", (e) => {
  isequal();
  label_name();
});
convert.addEventListener("click", () => assign());

//conversion functions
let decimal = 0,
  binary,
  hexadecimal,
  octal,
  intermediate,
  covert = "n",
  has_err;
function assign() {
  switch (type1.value) {
    case "decimal":
      decimal = Number(value1.value);
      has_err = disp_val_err(value1.value, "d");
      if (has_err === 1) {
        verr_p.innerText = `enter a valid ${type1.value} number,also dont enter any special characters`;
        break;
      } else if (has_err === 2) {
        verr_p.innerText = `decimal value must lie between 0 -  4,294,967,295`;
        break;
      }
      switch (type2.value) {
        case "binary":
          dec_bin(decimal);
          hexclr(decimal);
          break;
        case "octal":
          dec_oct(decimal);
          hexclr(decimal);
          break;
        case "hexadecimal":
          dec_hex(decimal);
          hexclr(decimal);
      }
      break;
    case "binary":
      binary = value1.value;
      has_err = disp_val_err(value1.value, "b");
      if (has_err === 1) {
        verr_p.innerText = `enter a valid ${type1.value} number,also dont enter any special characters`;
        break;
      }
      switch (type2.value) {
        case "decimal":
          intermediate = bin_dec(binary);
          hexclr(intermediate);
          break;
        case "octal":
          covert = "y";
          intermediate = bin_dec(binary);
          dec_oct(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
        case "hexadecimal":
          covert = "y";
          intermediate = bin_dec(binary);
          dec_hex(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
      }
      break;
    case "octal":
      octal = value1.value;
      has_err = disp_val_err(value1.value, "o");
      if (has_err === 1) {
        verr_p.innerText = `enter a valid ${type1.value} number,also dont enter any special characters`;
        break;
      }
      switch (type2.value) {
        case "decimal":
          intermediate = oct_dec(octal);
          hexclr(intermediate);
          break;
        case "binary":
          covert = "y";
          intermediate = oct_dec(octal);
          dec_bin(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
        case "hexadecimal":
          covert = "y";
          intermediate = oct_dec(octal);
          dec_hex(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
      }
      break;
    case "hexadecimal":
      hexadecimal = value1.value;
      has_err = disp_val_err(value1.value, "h");
      if (has_err === 1) {
        verr_p.innerText = `enter a valid ${type1.value} number,also dont enter any special characters`;
        break;
      }
      switch (type2.value) {
        case "decimal":
          intermediate = hex_dec(hexadecimal);
          hexclr(intermediate);
          break;
        case "octal":
          covert = "y";
          intermediate = hex_dec(hexadecimal);
          dec_oct(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
        case "binary":
          covert = "y";
          intermediate = hex_dec(hexadecimal);
          dec_bin(intermediate);
          hexclr(intermediate);
          covert = "n";
          break;
      }
      break;
  }
}
function dec_bin(v) {
  let bin = [];
  while (v != 0) {
    bin.unshift(v % 2);
    v = Math.trunc(v / 2);
  }
  while (bin.length < 32) {
    bin.unshift(0);
  }
  let out = "";
  for (let n of bin) {
    out += `${n}`;
  }
  console.log(out, typeof out, out.length);
  value2.value = out;
}
function hexclr(v) {
  console.log("hey");
  let clr = [];
  while (v != 0) {
    if (v % 16 < 10) clr.unshift(v % 16);
    else {
      switch (v % 16) {
        case 10:
          clr.unshift("A");
          break;
        case 11:
          clr.unshift("B");
          break;
        case 12:
          clr.unshift("C");
          break;
        case 13:
          clr.unshift("D");
          break;
        case 14:
          clr.unshift("E");
          break;
        case 15:
          clr.unshift("F");
          break;
      }
    }
    v = Math.trunc(v / 16);
  }
  let bxclr = "";
  if (clr.length > 6) {
    for (let n of clr) {
      bxclr += `${n}`;
    }
  } else {
    for (let n of clr) {
      bxclr += `${n}`;
    }
    while (bxclr.length < 6) {
      bxclr += "0";
    }
  }
  if (type2.value != "hexadecimal") {
    clrp.innerText = `the colour corresponding to the equivalent hexadecimal value(${bxclr}) of the ${type1.value} value ${value1.value} is:`;
  } else if (type2.value === "hexadecimal") {
    clrp.innerText = `the colour corresponding to the hexadecimal value(${bxclr}) is:`;
  }
  clrp.style.textTransform = "capitalize";
  clrbx.style.margin = "auto";
  clrbx.style.width = "10rem";
  clrbx.style.height = "10rem";
  clrbx.style.backgroundColor = `#${bxclr}`;
  console.log(clrbx, bxclr);
}
function dec_oct(v) {
  let oct = [];
  while (v != 0) {
    oct.unshift(v % 8);
    v = Math.trunc(v / 8);
  }
  let out = "";
  for (let n of oct) {
    out += `${n}`;
  }
  console.log(out, typeof out, out.length);
  value2.value = out;
}
function dec_hex(v) {
  let hex = [];
  while (v != 0) {
    if (v % 16 < 10) hex.unshift(v % 16);
    else {
      switch (v % 16) {
        case 10:
          hex.unshift("A");
          break;
        case 11:
          hex.unshift("B");
          break;
        case 12:
          hex.unshift("C");
          break;
        case 13:
          hex.unshift("D");
          break;
        case 14:
          hex.unshift("E");
          break;
        case 15:
          hex.unshift("F");
          break;
      }
    }
    v = Math.trunc(v / 16);
  }
  let hexout = "";
  for (let n of hex) {
    hexout += `${n}`;
  }
  value2.value = hexout;
}
function bin_dec(v) {
  let decimal_ = 0;
  let m = 1;
  for (let i = v.length - 1; i >= 0; i--) {
    decimal_ += Number(v[i]) * m;
    m *= 2;
  }
  if (covert === "n") {
    value2.value = decimal_;
  }
  return decimal_;
}
function oct_dec(v) {
  let decimal_ = 0;
  let m = 1;
  for (let i = v.length - 1; i >= 0; i--) {
    decimal_ += Number(v[i]) * m;
    m *= 8;
  }
  if (covert === "n") {
    value2.value = decimal_;
  }
  return decimal_;
}
function hex_dec(v) {
  let decimal_ = 0;
  let m = 1;
  for (let i = v.length - 1; i >= 0; i--) {
    console.log(v[i], Number(v[i]));
    if (Number(v[i]) < 10) {
      console.log("de");
      decimal_ += Number(v[i]) * m;
    } else {
      console.log("be");
      let a = v[i];
      switch (a.toUpperCase()) {
        case "A":
          decimal_ += 10 * m;
          break;
        case "B":
          decimal_ += 11 * m;
          break;
        case "C":
          decimal_ += 12 * m;
          break;
        case "D":
          decimal_ += 13 * m;
          break;
        case "E":
          decimal_ += 14 * m;
          break;
        case "F":
          decimal_ += 15 * m;
          break;
      }
    }
    m *= 16;
  }
  if (covert === "n") {
    value2.value = decimal_;
  }
  return decimal_;
}
