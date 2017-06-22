package com.oa.controller.system.login;

import com.oa.common.utils.VerifyCodeUtil;
import com.oa.entity.system.Account;
import com.oa.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Controller
public class LoginController {

    @Autowired
    private AccountService accountService;

    @RequestMapping("/loginIndex")
    public String index() {

        Account account = accountService.findFormatByLoginName("sa");

        return "/system/login/loginIndex";
    }

    /**
     * 生成登录验证码
     * @return
     */
    @RequestMapping(value="/verifyCode/slogin")
    public void slogin(HttpServletResponse response){
        //设置页面不缓存
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        //为了手机客户端方便使用数字验证码
        String verifyCode = VerifyCodeUtil.generateTextCode(VerifyCodeUtil.TYPE_NUM_ONLY, 4, null);
        try {
            //设置输出的内容的类型为JPEG图像
            response.setContentType("image/jpeg");
            BufferedImage bufferedImage = VerifyCodeUtil.generateImageCode(verifyCode, 90, 30, 3, true, Color.WHITE, Color.BLACK, null,null);
            //写给浏览器
            ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
