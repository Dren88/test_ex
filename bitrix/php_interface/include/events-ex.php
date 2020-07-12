<?
AddEventHandler("iblock", "OnBeforeIBlockElementDelete", array("EventHandlers", "OnBeforeIBlockElementDeleteHandler"));
class EventHandlers {
    function OnBeforeIBlockElementDeleteHandler(&$arFields) {
      $res = CIBlockElement::GetByID($arFields);
             if($ar_ID = $res->GetNext()){
             }
        $arItems = [];
        $arSelect = Array("ID", "NAME", "PROPERTY_RATING");
        $arFilter = Array("IBLOCK_ID"=>$ar_ID["IBLOCK_ID"]);
        $res = CIBlockElement::GetList(Array(), $arFilter, false, Array("nPageSize"=>50), $arSelect);
        while($ob = $res->GetNextElement())
        {
            $arFields = $ob->GetFields();
            $arItems[$arFields["ID"]] = $arFields["PROPERTY_RATING_VALUE"];
        }
        if($arItems[$ar_ID["ID"]] == max($arItems)) {
        // Получаем email всех администраторов
        $arAdminsMail = [];
        $filter = [
            "GROUPS_ID" => 1,
            "ACTIVE" => "Y"
        ];
        $rsUsers = CUser::GetList($by="id", $order="desc", $filter);
        while($user = $rsUsers->Fetch()) {
            $arAdminsMail[] = $user['EMAIL'];
        }
    /*dump($arAdminsMail, true);*/

            if(count($arAdminsMail) > 0)
            {
                $arEventFields = array(
                    "TEXT" => "Элемент с наибольшим количеством голосов был удаленен.",
                    "EMAIL" => implode(", ", $arAdminsMail),
                );
                CEvent::Send("AGENT_SEND", "s1", $arEventFields);
            }
        }
    }
}
