package com.oa.controller.system.backstage;

import com.oa.common.ajax.AjaxRes;
import com.oa.common.utils.base.Const;
import com.oa.common.utils.security.AccountShiroUtil;
import com.oa.common.utils.tree.MenuTreeUtil;
import com.oa.common.utils.webpage.PageData;
import com.oa.controller.base.BaseController;
import com.oa.entity.system.account.Account;
import com.oa.entity.system.resources.Resources;
import com.oa.service.system.resources.ResourcesService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/backstage/")
public class BackstageController extends BaseController<Object> {
	
	@Autowired
	public ResourcesService menuService;
	/**
	 * 访问系统首页
	 */
	@RequestMapping("index")
	public String index(Model model){
		//shiro获取用户信息
		Account currentAccount= AccountShiroUtil.getCurrentUser();
		model.addAttribute("currentAccount", currentAccount);		
		return "/system/index";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="menu/getMenu", method= RequestMethod.POST)
	@ResponseBody
	public AjaxRes getMenu(){
		AjaxRes ar=getAjaxRes();
		List<Resources> menus =new ArrayList<Resources>();
		PageData pd = this.getPageData();
		String ref=pd.getString("ref");
		String layer=pd.getString("layer");
		Object menu_o=null;
		try {
			//shiro获取用户信息,shiro管理的session
			Session session= SecurityUtils.getSubject().getSession();
			//获得用户
			Account acount=(Account) session.getAttribute(Const.SESSION_USER);
			//获得用户Id
			String userId=acount.getAccountId();
			if(!"y".equals(ref)){	
				menu_o=session.getAttribute(Const.SESSION_MENULIST);
			}
			menus=(List<Resources>)menu_o;
			if(menus==null){
				if(StringUtils.isBlank(layer))layer="1";
				menus=menuService.findMenuTree(userId,layer);
				session.setAttribute(Const.SESSION_MENULIST, menus);
			}
			if(menus!=null){
				//将对象处理成树
				String html= MenuTreeUtil.buildTreeHtml(menus);
				ar.setSucceed(html);
			}
		} catch (Exception e) {
			logger.error(e.toString(),e);
			ar.setFailMsg("获取菜单失败");
		}			
		return ar;
	}
	
	@RequestMapping("adv")
	public String advUI(Model model) {
		return "/system/adv/adv";
	}
	
	@RequestMapping("404")
	public String errorlistUI(Model model){
		return "/system/error/404";
	}
	/**
	 * 没权限页面
	 * @param model
	 * @return
	 */
	@RequestMapping("noAuthorized")
	public String noAuthorizedUI(Model model){
		return Const.NO_AUTHORIZED_URL;
	}
}
