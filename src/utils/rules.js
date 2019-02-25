
/*eslint-disable*/
/**
 * 数字&非必填
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function checkNumber(rule, value, callback) {
  if (value && !Number(value) && !Number.isInteger(Number(value))) {
    callback(new Error('请输入数字'));
  } else {
    callback()
  }
}

/**
 * 金额校验 整数或者小数点两位以内
 * @param rule
 * @param value
 * @param callback
 */
function checkPrice (rule, value, callback) {
  if (value && !/^([1-9]\d*|0)(\.\d{1,2})?$/.test(value)) {
    callback(new Error('请输入整数或小数点后两位以内小数'));
  } else {
    callback()
  }
}

/**
 * 手机号校验
 * @param rule
 * @param value
 * @param callback
 */
function checkPhone (rule, value, callback) {
  let reg = /^1[34578]\d{9}$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback()
  }
}

/**
 * 判断用英文逗号分割的id字符串
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function checkMultiId(rule, value, callback) {
  if (value) {
    if (/^(\d+[,])*(\d+)$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入数字或者英文逗号,分割的数字'))
    }
  } else {
    callback()
  }
}

/**
 * 非负整数&非必填
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function checkId(rule, value, callback) {
  if (!/^\d+$/.test(value)) {
    callback(new Error('请输入非负整数'));
    return
  }
  callback()
}


/**
 * 晚于当前时间
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function afterNow(rule, value, callback) {
  if (value && value.getTime() < Date.now()) {
    callback(new Error('必须晚于当前时间'));
  }
  callback()
};

function maxLength(maxNum) {
  let validFn = function (rule, value, callback) {
    if (value.length > maxNum) {
      callback(new Error('最多输入' + maxNum + '个字'))
    } else {
      callback()
    }
  }
  return validFn
}

/**
 * 以一个ASCII码1个字节、非ASCII码两个字节计算字节数
 * @param val
 * @returns {number}
 */
function countLength(val) {
  let str = String(val)
  let inputLength = 0
  // 给一个变量来记录长度
  for (let i = 0; i < str.length; i++) {
    let countCode = str.charCodeAt(i)
    // 返回指定位置的字符的Unicode编码
    // 判断是不是ASCII码,Unicode码前128个字符是ASCII码
    if (countCode >= 0 && countCode <= 128) {
      inputLength++;
    } else {
      inputLength += 2
      // 如果是扩展码，则一次+2
    }
  }
  return inputLength;
}

/**
 * 返回是否满足rule里的长度规则 用法见mall/goods/AddEditDialog.vue
 * @param rule 组件里定义的rule 例： { validator: checkLength, max: 10, message: '长度在10个字符以内', trigger: ['change', 'blur'] }
 * @param value
 * @param callback
 */
function checkLength(rule, value, callback) {
  let num = countLength(value)
  if (num < rule.min * 2 || num > rule.max * 2) {
    callback(new Error(rule.message))
  }
  callback()
}
/**
 * 最大值验证.
 * @param rule 组件里定义的rule 例： { validator: max, max: 10, message: '最大值为10', trigger: ['change', 'blur'] }
 * @param value
 * @param callback
 */
function max(rule, value, callback) {
  if (value !== "" && value !== null && value > rule.max) {
    callback(new Error('最大输入' + rule.max))
  }
  callback()
}

function min(rule, value, callback) {
  if (value !== "" && value !== null && value < rule.min) {
    callback(new Error('最小输入' + rule.min))
  }
  callback()
}
/**
 * 最大年龄格式验证
 * @param rule
 * @param value
 * @param callback
 */
function maxAge(rule, value, callback) {
  if (parseInt(value) < 0 || (value !== "" && value !== null && !/^-?\d+$/.test(value)) || parseInt(value) > parseInt(rule.max)) {
    callback(new Error("年龄填写错误"))
  }
  callback()
}
/**
 * 年龄区间验证
 * @param rule
 * @param value
 * @param callback
 */
function ageRange(rule, value, callback) {
  let { startYear, startMonth, startDay, endYear, endMonth, endDay } = rule.date;
  let stTotal = getTotalDay(startYear, startMonth, startDay);
  let etTotal = getTotalDay(endYear, endMonth, endDay);
  if (parseInt(stTotal) > parseInt(etTotal)) {
    callback(new Error("截止时间早于开始时间"))
  }
  callback()
}

// 孕期区间验证
// @param rule
// @param value
// @param callback
function pregnantTimeJudge(rule, value, callback) {
  let { preStartWeek, preStartDay, preEndDay, preEndWeek } = rule.date;
  let stTotal = getPregnantTime(preStartWeek, preStartDay);
  let edTotal = getPregnantTime(preEndWeek, preEndDay);
  if (parseInt(stTotal) > parseInt(edTotal)) {
    callback(new Error('截止时间早于开始时间'))
  }
  callback();
}

function checkQQUrl(rule, value, callback) {
  if (value !== "" && !/qqurl:/.test(decodeURIComponent(value))) {
    callback(new Error('请输入qqUrl'));
  } else {
    callback()
  }
}


// 周、日换算成天
function getPregnantTime(w = 0, d = 0) {
  let total = null;
  if ((w !== "" && w !== null) || (d !== "" && d !== null)) {
    total = (Number(w) * 7 + Number(d))
  }
  return total;
}


/**
 * 年、月、日换算成天
 * @param y
 * @param m
 * @param d
 */
function getTotalDay(y = 0, m = 0, d = 0) {
  let total = null;
  if ((y !== "" && y !== null) || (m !== "" && m !== null) || (d !== "" && d !== null)) {
    total = (Number(y) * 365 + Number(m) * 30 + Number(d));
  }
  return total;
}
/**
 * 日期区间验证
 * @param rule
 * @param value
 * @param callback
 */
function dataRanage(rule, value, callback) {
  let { startTime, endTime } = rule.date;
  let st = new Date(startTime).getTime();
  let et = new Date(endTime).getTime();
  if ((st !== "" || et !== "") && parseInt(st) > parseInt(et)) {
    callback(new Error("截止时间早于开始时间"))
  }
  callback()
}
/**
 * @param rule
 * @param value
 * @param callback
 */
function isQQEmail(rule, value, callback) {
  value = value ? value.replace(" ", "") + "@qq.com" : value;
  let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  let flag = reg.test(value);
  if (value && !flag) {
    callback(new Error("邮箱格式不正确"))
  }
  callback()
}

export {
  checkNumber,
  checkPrice,
  checkPhone,
  checkMultiId,
  checkId,
  afterNow,
  dataRanage,
  maxLength,
  countLength,
  checkLength,
  max,
  checkQQUrl,
  maxAge,
  ageRange,
  min,
  isQQEmail,
  pregnantTimeJudge
}
