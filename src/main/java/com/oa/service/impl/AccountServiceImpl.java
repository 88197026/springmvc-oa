package com.oa.service.impl;

import com.oa.dao.system.account.AccountDao;
import com.oa.entity.system.Account;
import com.oa.service.AccountService;
import com.oa.service.base.BaseServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl extends BaseServiceImp<Account> implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public Account findFormatByLoginName(String loginName) {
        Account a = null;
        try {
            a= accountDao.findFormatByLoginName(loginName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return a;
    }
}
