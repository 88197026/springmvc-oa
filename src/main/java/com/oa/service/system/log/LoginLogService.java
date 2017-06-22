package com.oa.service.system.log;

import com.oa.common.mybatis.Page;
import com.oa.entity.system.log.LoginLog;

import java.util.List;

public interface LoginLogService {

	public Page<LoginLog> findByPage(LoginLog o, Page<LoginLog> page);
	
	public void saveLoginLog(LoginLog o);
	
	public void deleteBatch(List<LoginLog> os);
}
