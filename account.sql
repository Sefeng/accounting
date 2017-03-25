CREATE TABLE IF NOT EXISTS `account_data`(
    `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
    `amount` float(2) NOT NULL COMMENT '价格',
    `remarks` varchar(255) NOT NULL COMMENT '备注',
    `type_id` tinyint(2) NOT NULL DEFAULT '1' COMMENT 'typeid：支出／收入 id',
    `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT 'type：1支出／2收入',
    `add_time` int(10) NOT NULL COMMENT '添加时间',
    `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
    PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;