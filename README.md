![](https://cool-js.com/team/gist.jpg)

## 官网

[https://cool-js.com](https://cool-js.com)

[插件开发文档](https://cool-js.com/admin/node/core/plugin.html#使用插件)

## 视频教程

[1、插件开发](https://www.bilibili.com/video/BV1aa4y187jh/)

[2、插件发布与使用](https://www.bilibili.com/video/BV1mw41157bx/)

## README 示例

下面时插件介绍的示例，你可以按照这样的规范写，当然不限于这种形式，你可以自由发挥，只要能表达清楚即可。

### 介绍

这是个示例插件， 写了一些简单的方法

### 标识

调用插件的时候需要用到标识，标识是唯一的，不能重复，建议使用英文，不要使用中文，对应插件 `plugin.json` 中的 `key` 字段

- 标识：test

### 配置

```json
{
  "appId": "xxx的appId",
  "appSecret": "xxx的appSecret"
}
```

### 方法

下面是插件提供的一些方法

- initSMTPService

```ts

/**
 * 初始化SMTP服务
 * @param smtpConfig 配置信息
 * @returns 返回smtp实例
 * @example
 * const sendMail = await initSMTPService({
 *   host: 'smtp.qq.com',
 *   port: 587,
 *   username: 'xxx@qq.com',
 *   password: 'xxx'
 * });
 */
interface smtpConfigType {
  host: string;
  port?: number;
  username: string;
  password: string;
  tls?: {
    rejectUnauthorized?: boolean;
  };
}
async initSMTPService(smtpConfig: smtpConfigType)
```

- sendMail

```ts
/**
 * 发送邮件
 * @param mailOptions 邮件配置信息
 * @returns 返回发送结果
 * @example
 * const res = await sendMail({
 *   from: 'xxx@qq.com',
 *   to: 'xxx@qq.com',
 *   subject: '测试邮件',
 *   text: '这是一封测试邮件',
 * });
 */
interface mailOptionsType {
  from: string; // 发送方邮箱的账号
  to: string; // 邮箱接受者的账号
  subject: string; // Subject line 标题
  content: string; // 邮件正文
}
sendMail(mailOptions: mailOptionsType)
```

### 调用示例

```ts
@Inject()
pluginService: PluginService;

// 获取插件实例
const instance = await this.pluginService.getInstance('sendMail');

const sendMail = await instance.initSMTPService({
  host: 'smtp.qq.com',
  port: 587,
  username: 'xxx@qq.com',
  password: 'xxx'
});

const res = await sendMail({
  from: 'xxx@qq.com',
  to: 'xxx@qq.com',
  subject: '测试邮件',
  content: '这是一封测试邮件',
});

console.log(res);


```

### 更新日志

- v1.0.0 (2024-04-15)
  - 初始版本
