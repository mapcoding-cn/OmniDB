# OmniDB 3.0.3-CN
OmniDB是一个开源的基于浏览器的DMS工具，它简化了专注于交互性的数据库管理,旨在实现在Web端强大的数据库管理功能,支持PostgreSQL/Oracle/ MySQL/MariaDB / SQLite等多种数据库,对于PostgreSQL的支持尤为完善. 

**体验地址**: https://db.mapcoding.cn 
**如果对你有帮助,请star感谢支持**

**如何部署**
``` 
docker pull ccr.ccs.tencentyun.com/mapcoding/mapcoding:dev-20220425
docker run -d --name omnidb-cn -p 8000:8000  ccr.ccs.tencentyun.com/mapcoding/mapcoding:dev-20220425
# 或者拉取代码自行编译镜像
git clone https://github.com/mapcoding-cn/omnidb-cn.git
docker build .
docker run -d --name omnidb-cn -p 8000:8000  [imageId]

```

**CN版本主要特性** 
+ 进行了本地化适配和大量流程简化 
+ 权限管控增强,限制高危sql执行
+ 极大增强代码智能提示特性
+ 支持导出CSV excel sql格式
+ 若干性能优化和bugfix 

**OmniDB主要特性**
+ 浏览器作为媒介,可以从任何平台访问 
+ 智能sql编辑器,上下文代码智能提示 
+ 一键生成执行计划/过程 
+ 支持导出excel表格 
+ 一键生成crud语句 
+ 支持保存常用sql 
+ 支持查看ddl定义 
+ 支持sql格式化 
+ 支持查询历史 
+ 支持数据库监控 
+ 支持连接共享 
+ 交互式数据库结构树 
+ 一键生成数据库结构图 
+ 查询结果可视化表格操作 
+ 真空分析 
+ 其他高级特性... 

**Website**: https://omnidb.org

**Full Documentation**: https://omnidb.readthedocs.io

![](https://raw.githubusercontent.com/OmniDB/doc/master/img/omnidb_3/dashboard.png)
