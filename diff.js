var objOld = {
	tag: 'div',
	name: '#root.root',
	children: [{
			tag: 'p',
			children: [{
				tag: 'strong',
				name: '.red'
			}]
		},
		{
			tag: 'span'
		},
		{
			tag: 'div',
			name: '#a.a.b',
			children: [{
					tag: 'span'
				},
				{
					tag: 'span'
				}
			]
		},
		{
			tag: 'p',
			name: '.p',
			children: [{
				tag: 'span'
			}, {
				tag: 'b'
			}]
		}
	]
};
var objNew = {
	tag: 'div',
	name: '#root.root',
	children: [{
			tag: 'p'
		},
		{
			tag: 'span',
			children: [{
				tag: 'strong',
				name: '.red'
			}]
		},
		{
			tag: 'div',
			name: '#a.b.c',
			children: [{
				tag: 'span'
			}]
		},
		{
			tag: 'p',
			name: '.p',
			children: [{
				tag: 'b'
			}]
		}
	]
};

// 进行单独节点的比较
function compareNode(oldNode, newNode) {
	// 如果都不存在子节点，直接返回
	if (!oldNode.children && !newNode.children) {
		return;
	}
	// 如果旧节点与新节点中有一个存在子节点
	else if (!oldNode.children || !newNode.children) {
		// 如果旧节点存在子节点
		if (!oldNode.children) {
			// 直接把新节点的子节点赋予旧节点
			oldNode.newChildren = newNode.children;
			return;
		} else {
			// 如果新节点存在子节点，删除旧节点的子节点
			oldNode.msg = '删除children';
			return;
		}
	} else {
		// 如果都存在子节点，进行子节点的比较
		compareChildren(oldNode.children, newNode.children);
	}
}

// 进行子节点的比较
function compareChildren(oldChildren, newChildren) {
	// 用比较笨的办法，双层循环进行比较
	for (var i = 0, newLen = newChildren.length; i < newLen; i++) {
		for (var j = 0, oldLen = oldChildren.length; j < oldLen; j++) {
			if (newChildren[i].tag === oldChildren[j].tag && newChildren[i].name === oldChildren[j].name) {
				// 当位置不同的时候，调整旧子节点中的位置
				if (i !== j) {
					oldChildren.splice(i, 0, ...oldChildren.splice(j, 1));
				}
				// 进行所有子节点的对比，最后跳出循环
				compareNode(oldChildren[i], newChildren[i]);
				break;
			}
		}
		// 检验是否存在对应的子节点，不存在则把新子节点中的节点添加进去
		if (j === oldLen) {
			oldChildren.splice(i, 0, newChildren[i]);
		}
	}
	// 遍历结束，如果旧子节点数多于新子节点数，则去掉旧子节点多余部分，反之，往旧子节点中添加新子节点多余的部分
	if (oldChildren.length > newChildren.length) {
		oldChildren.splice(newChildren.length);
	} else if (oldChildren.length < newChildren.length) {
		oldChildren.splice(oldChildren.length, 0, ...newChildren.splice(oldChildren.length));
	}
}

compareNode(objOld, objNew);
console.log(objOld);