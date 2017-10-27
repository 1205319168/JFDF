package com.jhonelee.jfdf.resource.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jhonelee.jfdf.resource.entity.Resource;
import com.jhonelee.jfdf.resource.service.ResourceService;

@Controller
public class ResourceController {
	
	@Autowired
	private ResourceService resourceService;
	
	@RequestMapping(value = "/resource/page", method = RequestMethod.GET)
	public String resource() {
		return "resource/resource";
	}
	
	
	@RequestMapping(value = "/resource", method = RequestMethod.GET)
	@ResponseBody
	public List<ResourceNode> loadResourceNodes(@RequestParam Long parentId) {
		List<Resource> resources = this.resourceService.loadResourcesByParentId(parentId);
		
		List<ResourceNode> result = new ArrayList<ResourceController.ResourceNode>();
		
		CollectionUtils.collect(resources, input -> new ResourceNode() , result);
		
		
		return null;
	}
	
	
	private static class ResourceNode {
		private Long id;
		
		private String name;
		
		private Boolean isParent;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Boolean getIsParent() {
			return isParent;
		}

		public void setIsParent(Boolean isParent) {
			this.isParent = isParent;
		}
		
	}

}