

// 去除特殊字符
export function stripscript(s) {
    var pattern = new RegExp("[`~!@%#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//验证邮箱
export function testEmail(value) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(value)
}

//验证密码
export function testPass(value) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;
    return !reg.test(value)
}

//验证验证码 

export function testYzCode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value)
}