export function usePhone(phone: string) {
  return new Promise((resolve, reject) => {
    uni.makePhoneCall({
      phoneNumber: phone,
      success: resolve,
      fail: reject,
    })
  })
}
