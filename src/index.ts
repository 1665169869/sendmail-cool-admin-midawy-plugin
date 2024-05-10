import { BasePlugin, CoolCommException } from "@cool-midway/plugin-cli";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
interface smtpConfigType {
  host: string;
  port?: number;
  username: string;
  password: string;
  tls?: {
    rejectUnauthorized?: boolean;
  };
}
interface mailOptionsType {
  from: string; // 发送方邮箱的账号
  to: string; // 邮箱接受者的账号
  subject: string; // Subject line 标题
  content: string; // 邮件正文
}

/**
 * 描述
 */
export class CoolPlugin extends BasePlugin {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null;

  /**
   * 插件已就绪，注意：单例插件只会执行一次，非单例插件每次调用都会执行
   */
  async ready() {
    console.log("插件就绪");
  }

  async initSMTPService(smtpConfig: smtpConfigType) {
    this.transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port || 465,
      secure: false,
      auth: {
        user: smtpConfig.username,
        pass: smtpConfig.password,
      },
      tls: {
        rejectUnauthorized: smtpConfig.tls?.rejectUnauthorized || false,
      },
      socketTimeout: 5000,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      dnsTimeout: 5000
    });

    return async (mailOptions: mailOptionsType) => {
      try {
        return await this.transporter.sendMail({
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject,
          html: mailOptions.content,
        });
      } catch (error) {
        throw error;
      }
    };
  }

  /**
   * 展示插件信息
   * @param a 参数a
   * @param b 参数b
   * @returns 插件信息
   */
  async show(a, b) {
    console.log("传参", a, b);
    return this.pluginInfo;
  }

  // /**
  //  * 使用缓存，使用cool-admin的缓存，开发的时候只是模拟
  //  */
  // async useCache() {
  //   await this.cache.set("a", "一个项目用COOL就够了");
  //   const r = await this.cache.get("a");
  //   console.log(r);
  // }

  // /**
  //  * 调用其他插件
  //  */
  // async usePlugin() {
  //   // 获得其他插件，开发的时候无法调试，只有安装到cool-admin中才能调试
  //   const plugin = await this.pluginService.getInstance("xxx");
  //   console.log(plugin);
  // }

  // /**
  //  * 请求网络示例
  //  */
  // async demo() {
  //   const res = await axios.get("https://www.baidu.com");
  //   return res.data;
  // }

  // /**
  //  * 读取文件示例
  //  */
  // async readFile() {
  //   // 如果是本地开发，filePath指向的是插件的根目录的文件
  //   const { filePath } = this.pluginInfo.config;
  //   const result = fs.readFileSync(filePath);
  //   return result.toString();
  // }
}

// 导出插件实例， Plugin名称不可修改
export const Plugin = CoolPlugin;
