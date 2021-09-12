import tagListModel from '@/models/tagListModel';

export default {
    //tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) {//箭头函数的this是window，所以把这里的箭头函数改掉
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
            window.alert('标签名重复了');
        } else if (message === 'success') {
            window.alert('添加成功');
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
}