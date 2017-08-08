using System;
using System.Linq;
using CMS.PortalEngine.Web.UI;
using CMS.Helpers;
using CMS.Core;
using CMS.Activities;
using CMS.DocumentEngine;
using CMS.Taxonomy;
using CMS.ContactManagement;
using CMS.PortalEngine;

public partial class CMSWebParts_Custom_OM_ContactPageViewActivity : CMSAbstractWebPart
{

	public override void OnContentLoaded()
	{
		base.OnContentLoaded();
		SetupControl();
    }
    protected void SetupControl()
    {
        if (PortalContext.ViewMode == ViewModeEnum.LiveSite)
        {
            TreeNode currentpage = DocumentContext.CurrentDocument;
            ContactInfo contact = ContactManagementContext.CurrentContact;
            var contacts = (String)GetValue("Categories");
            if (contacts != null)
            {
                var contactIDs = contacts.Split(';').Select(Int32.Parse).ToList();
                
                if (currentpage.Categories.Count != 0)
                {
                    foreach (CategoryInfo Category in currentpage.Categories)
                    {
                        if (contactIDs.Contains(Category.CategoryID))
                        {
                            // Obtains the activity logging service
                            var service = Service.Entry<IActivityLogService>();

                            // Prepares an initializer for logging the activity
                            var activityInitializer = new PageCategoryActivityInitializer(contact.ContactID, currentpage.NodeSiteID, currentpage.NodeID, currentpage.NodeAliasPath, Category.CategoryID, Category.CategoryName, Category.CategoryDisplayName);

                            // Logs the activity
                            service.Log(activityInitializer, CMSHttpContext.Current.Request);
                        }
                    }
                }
            }
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {        
    }
    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);       
    }
}