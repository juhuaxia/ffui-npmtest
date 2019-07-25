export const EMIAL_OR_PHONE = /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/
export const EMIAL = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const PASSWORD = /\S{6,}/
export const ZIPCODE = /^[0-9]{6}$/
export const CN_ID = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
export const CN_NAME = /^[\u4e00-\u9fa5·∙•・●]{2,20}$/
export const CONTAINS_CHINESE = /[\u4E00-\u9FA5]/i
export const CN_PHONE = /^1[0-9]{10}$/
// eslint-disable-next-line no-useless-escape
export const CONTAINS_EMOJI = /[^\s\u4E00-\u9FA5\w!@#/:;“,?‘{}|~<>+=._£%¥\-\^\&*\)\(\[\]\$]/g
