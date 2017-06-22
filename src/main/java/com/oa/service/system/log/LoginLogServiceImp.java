package com.oa.service.system.log;

import com.oa.common.mybatis.Page;
import com.oa.common.utils.base.UuidUtil;
import com.oa.dao.system.log.LoginLogDao;
import com.oa.entity.system.log.LoginLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service("LoginLogService")
public class LoginLogServiceImp implements LoginLogService{

	@Autowired
	private LoginLogDao dao;
	
	@Override
	public Page<LoginLog> findByPage(LoginLog o, Page<LoginLog> page) {
		page.setResults(dao.findByPage(o, page));
		return page;
	}

	@Override
	public void saveLoginLog(LoginLog o) {
		o.setId(UuidUtil.get32UUID());
		o.setLoginTime(new Date());
		dao.insert(o);
	}

	@Override
	public void deleteBatch(List<LoginLog> os) {
		dao.deleteBatch(os);
	}

}
