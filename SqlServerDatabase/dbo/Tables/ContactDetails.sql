CREATE TABLE [dbo].[ContactDetails] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (MAX) NOT NULL,
    [Email]    NVARCHAR (MAX) NOT NULL,
    [Mobile]   NVARCHAR (15)  NOT NULL,
    [Landline] NVARCHAR (20)  NULL,
    [Website]  NVARCHAR (MAX) NULL,
    [Address]  NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_ContactDetails] PRIMARY KEY CLUSTERED ([Id] ASC)
);

