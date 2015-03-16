//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebDBService.Models
{
    using System;
    using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations.Schema;
	using JiYun.Web.Models;
	using System.ComponentModel.DataAnnotations;
    
    public partial class UserCompanyInfos:BaseModel
    {
        public UserCompanyInfos()
        {
            this.AssetInfos = new HashSet<AssetInfos>();
        }
    
        public string CompanyName { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public string CallForShort { get; set; }
        public string LoginPassword { get; set; }
        public Nullable<int> OrganCategory { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Linkman { get; set; }
        public string LinkmanMobile { get; set; }
        public string QQ { get; set; }
        public string email { get; set; }
    
        public virtual ICollection<AssetInfos> AssetInfos { get; set; }
    }
    
}