$(function() {
	"use strict";
	
	var ctx = $('#ctx').val();
	
	var setting = {
		async : {
			enable : true,
			url : ctx + '/resource/' 
		},
		view : {
			addHoverDom : function(treeId, treeNode) {
				var sObj = $("#" + treeNode.tId + "_span");
				if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
					return;
				var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
				sObj.after(addStr);
				var btn = $("#addBtn_" + treeNode.tId);
				if (btn)
					btn.bind("click", function() {
						var zTree = $.fn.zTree.getZTreeObj("treeDemo");
						zTree.addNodes(treeNode, {
							id : (100 + newCount),
							pId : treeNode.id,
							name : "new node" + (newCount++)
						});
						return false;
					});
			},
			removeHoverDom : function(treeId, treeNode) {
				$("#addBtn_" + treeNode.tId).unbind().remove();
			},
			selectedMulti : false
		},
		check : {
			enable : true
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		edit : {
			enable : true
		}
	};

	var zNodes = [ {
		id : 1,
		pId : 0,
		name : "父节点1",
		open : true
	}, {
		id : 11,
		pId : 1,
		name : "父节点11"
	}, {
		id : 111,
		pId : 11,
		name : "叶子节点111"
	}, {
		id : 112,
		pId : 11,
		name : "叶子节点112"
	}, {
		id : 113,
		pId : 11,
		name : "叶子节点113"
	}, {
		id : 114,
		pId : 11,
		name : "叶子节点114"
	}, {
		id : 12,
		pId : 1,
		name : "父节点12"
	}, {
		id : 121,
		pId : 12,
		name : "叶子节点121"
	}, {
		id : 122,
		pId : 12,
		name : "叶子节点122"
	}, {
		id : 123,
		pId : 12,
		name : "叶子节点123"
	}, {
		id : 124,
		pId : 12,
		name : "叶子节点124"
	}, {
		id : 13,
		pId : 1,
		name : "父节点13",
		isParent : true
	}, {
		id : 2,
		pId : 0,
		name : "父节点2"
	}, {
		id : 21,
		pId : 2,
		name : "父节点21",
		open : true
	}, {
		id : 211,
		pId : 21,
		name : "叶子节点211"
	}, {
		id : 212,
		pId : 21,
		name : "叶子节点212"
	}, {
		id : 213,
		pId : 21,
		name : "叶子节点213"
	}, {
		id : 214,
		pId : 21,
		name : "叶子节点214"
	}, {
		id : 22,
		pId : 2,
		name : "父节点22"
	}, {
		id : 221,
		pId : 22,
		name : "叶子节点221"
	}, {
		id : 222,
		pId : 22,
		name : "叶子节点222"
	}, {
		id : 223,
		pId : 22,
		name : "叶子节点223"
	}, {
		id : 224,
		pId : 22,
		name : "叶子节点224"
	}, {
		id : 23,
		pId : 2,
		name : "父节点23"
	}, {
		id : 231,
		pId : 23,
		name : "叶子节点231"
	}, {
		id : 232,
		pId : 23,
		name : "叶子节点232"
	}, {
		id : 233,
		pId : 23,
		name : "叶子节点233"
	}, {
		id : 234,
		pId : 23,
		name : "叶子节点234"
	}, {
		id : 3,
		pId : 0,
		name : "父节点3",
		isParent : true
	} ];
	
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});