package com.oa.dao.system.log;

import com.oa.common.mybatis.Page;
import com.oa.dao.base.JYBatis;
import com.oa.entity.system.log.LoginLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@JYBatis
public interface LoginLogDao {

	public List<LoginLog> findByPage(@Param("param") LoginLog o, Page<LoginLog> page);
	
	public void insert(LoginLog o);
	
	public void deleteBatch(List<LoginLog> os);
}
