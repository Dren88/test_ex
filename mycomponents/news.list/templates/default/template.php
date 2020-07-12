<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<script>
    function changeValuePlusPlashka(plus){
        var elem = $(plus).parent().children('.set-count');
        var oldElem = $(plus).parent().children('.oldVal');
        var valueHowMuch =  parseInt($(plus).parent().children('.set-count').val());
        var newVal = valueHowMuch+1;
        oldElem.text(valueHowMuch);
        elem.val(newVal);
    }
    function changeValueMinusPlashka(minus){
        var elem = $(minus).parent().children('.set-count');
        var valueHowMuch =  parseInt($(minus).parent().children('.set-count').val());
        var newVal = valueHowMuch-1;
        elem.val(newVal);
    }
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<div class="news-list">
<?foreach($arResult["ITEMS"] as $arItem):?>
<div class="news-item">
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<p class="news-items" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
    <span hidden class="arItemID"><?=$arItem["ID"]?></span>
		<?if(is_array($arItem["PREVIEW_PICTURE"])):?>
				<img
					class="preview_picture"
					border="0"
					src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"
					width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>"
					height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>"
					alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>"
					title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>"
					style="float:left"
					/>
		<?endif?>
        <b><?echo $arItem["NAME"]?></b><br />
		<?if($arItem["PREVIEW_TEXT"]):?>
			<?echo $arItem["PREVIEW_TEXT"];?>
		<?endif;?>
		<?if(is_array($arItem["PREVIEW_PICTURE"])):?>
			<div style="clear:both"></div>
		<?endif?>
    <?if($arItem["PROPERTIES"]["RATING"]['ID']){
        $prop_type = "PROPERTIES";
        }
        elseif(($arItem["DISPLAY_PROPERTIES"]["RATING"]['ID'])){
            $prop_type = "DISPLAY_PROPERTIES";
        }
    ?>
    <?Bitrix\Main\Page\Frame::getInstance()->startDynamicWithID("area");?>
<form method="post">
    <?echo $arItem[$prop_type]["RATING"]["NAME"];?>
    <div class="catalog-item__set-count">
        <span class="set-count__minus" onclick="changeValueMinusPlashka(this)">-</span>
        <input id="area" name="news_value" type="text" value="<?echo ($arItem[$prop_type]["RATING"]["VALUE"] ? $arItem[$prop_type]["RATING"]["VALUE"] : 0);?>" class="set-count">
        <input name="news_ID" hidden type="text" value="<?echo $arItem["ID"];?>">
        <span class="set-count__plus" onclick="changeValuePlusPlashka(this)">+</span>
        <input class="edit_RATING" type="submit">
    </div>
</form>
    <?Bitrix\Main\Page\Frame::getInstance()->finishDynamicWithID("area", "");?>
</div>

<?endforeach;?>
</div>
<?if($arResult['NAV_RESULT']->NavPageCount > 1):?>
    <?if ($arResult['NAV_RESULT']->NavPageNomer + 1 <= $arResult['NAV_RESULT']->nEndPage):?>
        <?
        $plus = $arResult['NAV_RESULT']->NavPageNomer + 1;
        $url = '/news/?' . "PAGEN_".$arResult['NAV_RESULT']->NavNum."=".$plus;
        ?>
        <div class="load_more_news button" data-url="<?=$url?>">
            Показать еще
        </div>
    <?endif?>
<?endif?>
<script>
    $(document).ready(function(){
        $(document).on('click', '.load_more_news', function(){
            var targetContainer = $('.news-list'),          //  Контейнер, в котором хранятся элементы
                url =  $('.load_more_news').attr('data-url');    //  URL, из которого будем брать элементы
            if (url !== undefined) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'html',
                    success: function(data){
                        //  Удаляем старую навигацию
                        $('.load_more_news').remove();
                        var elements = $(data).find('.news-item'),  //  Ищем элементы
                            pagination = $(data).find('.load_more_news');//  Ищем навигацию
                        targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                        targetContainer.append(pagination); //  добавляем навигацию следом
                    }
                })
            }
        });
        $(document).on('click', '.edit_RATING', function(){
            let news_ID = $(this).parent().find("input[name=news_ID]").val();
            let news_value = $(this).parent().find("input[name=news_value]").val();
            $.ajax({
                url: "",
                type: "POST", //метод отправки
                data: {
                    ID: news_ID,
                    value: news_value,
                },
            });
        });
    });
</script>
<?
$el = new CIBlockElement;
$PROP = array();
$PROP[10] = $_POST["news_value"];
$arLoadProductArray = Array(
    "PROPERTY_VALUES"=> $PROP
);
$PRODUCT_ID = $_POST["news_ID"];  // изменяем элемент с кодом (ID) 2
$res = $el->Update($PRODUCT_ID, $arLoadProductArray);
?>