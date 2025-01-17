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
    
    public partial class LaborInfos:BaseModel
    {
        public LaborInfos()
        {
            this.OnDuties = new HashSet<OnDuties>();
        }
    
        public string LaborType { get; set; }
        public Nullable<System.DateTime> Starttime { get; set; }
        public Nullable<System.DateTime> Endtime { get; set; }
        public string LaborContent { get; set; }
        public string LaborPlace { get; set; }
        public Nullable<int> IsWholeDay { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
    
        public virtual ICollection<OnDuties> OnDuties { get; set; }
    }
    
}
