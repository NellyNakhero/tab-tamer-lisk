// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TabTamer {
    struct LinkItem {
        uint256 id;
        string url;
        string title;
        uint256 reminderTime;
        bool read;
        uint256 coinsEarned;
    }

    struct Category {
        uint256 id;
        string name;
        uint256[] linkIds;
    }

    // User => category IDs
    mapping(address => uint256[]) private userCategories;
    // User => category ID => Category
    mapping(address => mapping(uint256 => Category)) private categories;
    // User => link ID => LinkItem
    mapping(address => mapping(uint256 => LinkItem)) private links;

    uint256 private nextCategoryId = 1;
    uint256 private nextLinkId = 1;
    uint256 public rewardPerLink = 10;

    /** Add a new category */
    // function addCategsory(string calldata name) external {
    //     uint256 categoryId = nextCategoryId++;

    //     categories[msg.sender][categoryId] = Category({
    //         id: categoryId,
    //         name: name,
    //         linkIds: new uint256   // FIX: initialize empty array
    //     });

    //     userCategories[msg.sender].push(categoryId);
    // }

    /** Add a new category */
    function addCategory(string calldata name) external {
    uint256 categoryId = nextCategoryId++;

    // Create an empty category first
    Category storage newCategory = categories[msg.sender][categoryId];
    newCategory.id = categoryId;
    newCategory.name = name;
    // linkIds is already an empty array by default

    userCategories[msg.sender].push(categoryId);
}


    /** Add a link under a category */
    function addLink(
        uint256 categoryId,
        string calldata url,
        string calldata title,
        uint256 reminderTime
    ) external {
        require(bytes(categories[msg.sender][categoryId].name).length != 0, "Category not found");

        uint256 linkId = nextLinkId++;
        links[msg.sender][linkId] = LinkItem({
            id: linkId,
            url: url,
            title: title,
            reminderTime: reminderTime,
            read: false,
            coinsEarned: 0
        });

        categories[msg.sender][categoryId].linkIds.push(linkId);
    }

    /** Mark a link as read and earn coins */
    function markLinkAsRead(uint256 linkId) external {
        LinkItem storage link = links[msg.sender][linkId];
        require(!link.read, "Already read");

        link.read = true;
        link.coinsEarned += rewardPerLink;
    }

    /** Get all categories for a user */
    function getCategories() external view returns (Category[] memory) {
        uint256[] memory ids = userCategories[msg.sender];
        Category[] memory result = new Category[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = categories[msg.sender][ids[i]];
        }

        return result;
    }

    /** Get all links for a category */
    function getLinks(uint256 categoryId) external view returns (LinkItem[] memory) {
        uint256[] memory linkIds = categories[msg.sender][categoryId].linkIds;
        LinkItem[] memory result = new LinkItem[](linkIds.length);

        for (uint256 i = 0; i < linkIds.length; i++) {
            result[i] = links[msg.sender][linkIds[i]];
        }

        return result;
    }
}
