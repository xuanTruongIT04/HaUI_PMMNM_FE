export const auth = reactive({
  title: "",
  linkBackgroundImage: "",
});
export const slogan =
  "Chúng tôi sẽ không bao giờ chia sẻ thông tin của bạn với bất kỳ ai.";
export const errMessages = reactive({
  isError: true,
  textColor: "",
  errorUsername: "",
  errorPassword: "",
  errorConfirmPassword: "",
  errorEmail: "",
  content: slogan,
  errEmail: "",
});
