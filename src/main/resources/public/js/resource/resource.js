$(function() {
	"use strict";

	// ***************************************tree set***********************************************/
	function cleanForm() {
		$('#resourceForm input').val('');
		$('#resourceForm select').val('');
		$('#url option').remove();
		$('#url').append('<option value="">--请选择--</option>');
	}

	function initForm(id, parentId) {
		$('#resourceForm #id').val(id == null ? '' : id);
		$('#resourceForm #parentId').val(parentId == null ? '' : parentId);
	}

	var setting = {
		async : {
			enable : true,
			url : $('#__ctx').val() + '/resource',
			type : 'GET',
			autoParam : [ "id" ]
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
						cleanForm();
						initForm(null, treeNode.id);

						// var zTree = $.fn.zTree.getZTreeObj("treeDemo");
						// zTree.addNodes(treeNode, {
						// id : 10000,
						// pId : treeNode.id,
						// name : "new node"
						// });
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
		},
		callback : {
			beforeEditName : function() {

			},
			beforeRemove : function() {

			},
			onExpand : function(event, treeId, treeNode) {
				$.fn.zTree.getZTreeObj('resourceTree').reAsyncChildNodes(treeNode, 'refresh');
			}
		}
	};

	$.fn.zTree.init($("#resourceTree"), setting);
	// ***************************************tree set***********************************************/

	// ************************************Select2 setup*********************************************/
	$('#url').select2({
		ajax : {
			url : $('#__ctx').val() + '/requestMappings',
			dataType : 'json',
			data : function(params) {
				return {
					search : params.term
				}
			}
		// Additional AJAX parameters go here; see the end of this chapter for
		// the full code of this example
		}
	});
	// ************************************Select2 setup*********************************************/
	
	$('#resourceIconType').next().hide();
	$('#resourceIconType').bind('change', function(){
		$('#iconPath').val('');
		
		var $this = $(this);
		
		if ($this.val() == '') {
			$this.next().hide();
		}
		else if ($this.val() == 'ICON') {
			$this.next().show();
		}
		else if ($this.val() == 'IMG') {
			
		}
		else {
			return;
		}
	});

});