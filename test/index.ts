import { Plugin } from "../src/index";
import pluginInfo from "../plugin.json";

const mailConfig = {
  username: '1665169869@qq.com',
  password: 'xxxxxxxx',
  from: `cool-admin😎 <1665169869@qq.com>`,
  host: 'smtp.qq.com',
  port: 587,

  // 是否开启ssl
  ssl: false,
  // 是否开启调试
  debug: false,

  smsCode: {
    timeout: 60 * 3,
  },
};

// 实例化插件
const instance = new Plugin();
// 初始化插件
instance.init(pluginInfo);
(async () => {
  // 调用插件方法
  const sendMail = await instance.initSMTPService(mailConfig);
  const info = await sendMail({
    from: mailConfig.from,
    to: '1665169869@qq.com',
    subject: 'Hello ✔',
    content: 'Hello world?',
  })

  console.log(info);
  
})();
