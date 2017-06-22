package com.oa.service;

import com.oa.entity.system.Account;
import com.oa.service.base.BaseService;

public interface AccountService extends BaseService<Account> {

    /**
     * 根据登录帐号查找loginName和accountType，正常只有一条数据
     * and a.isvalid='1' and a.account_type='1'需要该条件
     * @param loginName
     * @return
     */
    public Account findFormatByLoginName(String loginName);
}
