package com.jhonelee.jfdf.resource.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Service;

import com.jhonelee.jfdf.authority.entity.Authority;
import com.jhonelee.jfdf.resource.entity.Resource;
import com.jhonelee.jfdf.resource.repository.ResourceRepository;

@Service
public class ResourceService {

	@Autowired
	private ResourceRepository resourceRepository;
	
	private String filePath = "resource.xml";

	@Transactional
	public void saveOrUpdate(Resource resource) {
		this.resourceRepository.save(resource);
	}

	public List<Resource> findAll() {
		return this.resourceRepository.findAll();
	}
	

	@Transactional
	public void initResource() {

		InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(filePath);
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Resource.class);
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

			Resource resource = (Resource) unmarshaller.unmarshal(inputStream);

			this.setResourceReference(resource);

			this.resourceRepository.save(resource);
		} catch (JAXBException e) {
			throw new RuntimeException("Resource init exception!", e);
		}
	}
	
	private void setResourceReference(Resource resource) {
		for (Resource resource1 : resource.getChildren()) {
			resource1.setParent(resource);
			this.setResourceReference(resource1);
		}
	}
	
	@Transactional
	public void reflushRequestMap(Map<RequestMatcher, Collection<ConfigAttribute>> requestMap) {
		List<Resource> resources = this.resourceRepository.findAll();
		requestMap.clear();
		for (Resource resource : resources) {
			addResource(requestMap, resource);
		}
	}
	
	private void addResource(Map<RequestMatcher, Collection<ConfigAttribute>> requestMap, Resource resource) {
		if (StringUtils.isNotEmpty(resource.getUrl())) {
			RequestMatcher requestMatcher = StringUtils.isEmpty(resource.getHttpMethod()) ? new AntPathRequestMatcher(resource.getUrl())
					: new AntPathRequestMatcher(resource.getUrl(), resource.getHttpMethod());
			String[] authorityCodes = this.getAuthorityCodes(resource.getAuthorities());
			Collection<ConfigAttribute> configAttributes = SecurityConfig.createList(authorityCodes);
			requestMap.put(requestMatcher, configAttributes);
		}
	}
	
	private String[] getAuthorityCodes(List<Authority> allAuthorities) {
		List<String> outputCollection = new ArrayList<String>();
		CollectionUtils.collect(allAuthorities, new Transformer<Authority, String>() {
			public String transform(Authority input) {
				return input.getAuthorityCode();
			}
		}, outputCollection);
		return outputCollection.toArray(new String[] {});
	}
	
}