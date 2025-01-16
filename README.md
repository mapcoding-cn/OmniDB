# OmniDB 3.0.3-CN
OmniDB是一个开源的基于浏览器的DMS工具,支持智能sql编辑器,上下文代码智能提示等.它简化了专注于交互性的数据库管理,旨在实现在Web端强大的数据库管理功能,支持PostgreSQL/Oracle/ MySQL/MariaDB / SQLite等多种数据库,对于PostgreSQL的支持尤为完善. 

**体验地址**: https://db.mapcoding.cn 
**如果对你有帮助,请star感谢支持**

**如何部署**
管理员默认密码**admin/admin**
``` 
docker pull ccr.ccs.tencentyun.com/mapcoding/mapcoding:dev-20221009
docker run -d --name omnidb-cn -p 8000:8000  ccr.ccs.tencentyun.com/mapcoding/mapcoding:dev-20221009
# 或者拉取代码自行编译镜像 默认密码 admin/admin
git clone https://github.com/mapcoding-cn/omnidb-cn.git
docker build .
docker run -d --name omnidb-cn -p 8000:8000  [imageId]

```

**CN版本主要特性** 
+ 进行了本地化适配和大量流程简化 
+ 权限管控增强和自助账号注册体系
+ 极大增强代码智能提示特性
+ 支持导出CSV excel sql格式
+ 支持连接分享 
+ 若干性能优化和bugfix



**Website**: https://omnidb.org

**Full Documentation**: https://omnidb.readthedocs.io


<img width="1007" alt="image" src="https://github.com/mapcoding-cn/omnidb-cn/assets/15833367/a4753c80-673c-4ccc-898c-58a7467014b5">
