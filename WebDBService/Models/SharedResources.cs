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
    
    public partial class SharedResources:BaseModel
    {
        public string FileNo { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public Nullable<int> FileSize { get; set; }
        public Nullable<int> CategoryNo { get; set; }
        public string FileDescription { get; set; }
    }
    
}