package com.oa.entity.base;

import java.io.Serializable;
import java.util.Date;

/**
 * 实体类基础表
 */
public class BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Integer id;
	private Date createTime;
	private Date updateTime;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
