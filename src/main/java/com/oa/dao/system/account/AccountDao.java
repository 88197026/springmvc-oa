package com.oa.dao.system.account;

import com.oa.dao.base.BaseDao;
import com.oa.dao.base.JYBatis;
import com.oa.entity.system.Account;

/**
 * 用户数据层
 */
@JYBatis
public interface AccountDao extends BaseDao<Account> {
    /**
     * 根据登录帐号查找loginName和accountType，正常只有一条数据
     * and a.isvalid='1' and a.account_type='1'需要该条件
     * @param loginName
     * @return
     */
    public Account findFormatByLoginName(String loginName);

}
