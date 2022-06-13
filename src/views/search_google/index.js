/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

import * as API from '../../apis';
import {colorDDDEE1, colorFFFFFF} from '../../constants/colors';
import NavigationService from '../../navigation';
import Routes from '../../navigation/Routes';

import icon from '../../../assets/images';

import Header from '../../components/Header';
import DialogView from '../../components/DialogView';
import LoadingView from '../../components/LoadingView';
import NotificationView, {
  STATUS_NOTIFY,
} from '../../components/NotificationView';

export default function SearchGoogle() {
  const [query, setQuery] = useState();
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isDialogSave, setDialogSave] = useState(false);
  const [isLoad, setLoading] = useState(false);
  const [isShowNoti, setShowNoti] = useState(false);
  const [dataNoti, setDataNoti] = useState();
  const dataImage = [
    {
      id: 0,
      src: 'https://www.gardeningknowhow.com/wp-content/uploads/2021/07/sulfur-cosmos-mexican-aster-flowers.jpg',
    },
    {
      id: 1,
      src: 'https://i.pinimg.com/550x/b0/c2/75/b0c27503524c4e742b9cea470a227f21.jpg',
    },
    {
      id: 2,
      src: 'https://www.farmersalmanac.com/wp-content/uploads/2021/04/forget-me-not-flower-as309740666.jpeg',
    },
    {
      id: 3,
      src: 'https://res.edu.vn/wp-content/uploads/2022/01/unit-11-flowers.jpg',
    },
    {
      id: 4,
      src: 'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg',
    },
    {
      id: 5,
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-flowers-1613759017.jpg?crop=0.669xw:1.00xh;0.0635xw,0&resize=640:*',
    },
    {
      id: 6,
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/surprising-flower-meanings-balloon-flowers-1650767465.jpg?crop=1xw:1xh;center,top&resize=480:*',
    },
    {
      id: 7,
      src: 'https://i.guim.co.uk/img/media/0c21cb1ad2b90f19542325b961054ac3926f0dfe/0_2952_3280_1968/master/3280.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=cf1e68cb41ae226bf1b78b5c635ca2ed',
    },
    {
      id: 8,
      src: 'https://www.timeoutdubai.com/cloud/timeoutdubai/2022/02/07/Where-to-buy-flowers-in-the-UAE.jpg',
    },
    {
      id: 9,
      src: 'https://images.freeimages.com/images/large-previews/792/flowers-1558341.jpg',
    },
    {
      id: 10,
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dahlia-1508785047.jpg?crop=1.00xw:0.669xh;0,0.0136xh&resize=480:*',
    },
    {
      id: 11,
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-743744991-612x612-1612204822.jpg',
    },
  ];

  useEffect(() => {
    callAPIListImage();
  }, [query]);

  const callAPIListImage = () => {
    setLoading(true);
    let urlSearch = `${API?.API}&q=${query}`;
    console.log('urlSearch: ', urlSearch);
    axios({
      method: 'get',
      url: urlSearch,
    })
      .then(response => {
        setLoading(false);
        setShowNoti(true);
        console.log('dataNe: ', response.data);
        if (response.data.length === 0) {
          console.log('noti: ', 'can not get data');
          setDataNoti({
            status: STATUS_NOTIFY.ERROR,
            content: 'Error',
          });
        } else {
          console.log('noti: ', 'data has been obtained');
          const getList = response?.data?.items || [];
          if (getList.length > 0) {
            convertData(getList);
          } else {
            setDataNoti({
              status: STATUS_NOTIFY.ERROR,
              content: 'Error',
            });
          }
        }
      })
      .catch(error => {
        setLoading(false);
        setShowNoti(true);
        console.log(error);
        setDataNoti({
          status: STATUS_NOTIFY.ERROR,
          content: 'Can not connect to server',
        });
      });
  };

  const convertData = data => {
    var dataConvert = [];
    if ((data || []).length > 0 && query) {
      for (let i = 0; i < (data || []).length; i++) {
        var item = {};
        item.src = data[i]?.pagemap?.cse_image || null;
        item.id = i;
        dataConvert.push(item);
      }
    }
    console.log('dataConvert: ', dataConvert);
    setListData(dataConvert);
  };

  const renderSearchView = () => {
    return (
      <View style={styles.ctnSearchView}>
        <TextInput
          style={styles.textInputSearch}
          value={query}
          onChangeText={text => setQuery(text)}
        />
        <TouchableOpacity onPress={query ? _onPressClose : null}>
          <Image
            source={query ? icon.ic_close : icon.ic_search}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const _onPressClose = () => {
    setQuery();
  };

  const RenderItem = ({item}) => {
    const source = (item?.src || []).length > 0 ? item?.src[0]?.src : null;
    const _onPressItem = () => {
      var selectID = [...selectedItem];
      if (selectID.includes(item?.id)) {
        selectID = selectID.filter(val => val !== item?.id);
      } else {
        selectID.push(item?.id);
      }
      setSelectedItem(selectID);
      console.log('selectID: ', selectID);
    };
    return (
      <TouchableOpacity onPress={_onPressItem}>
        <ImageBackground
          source={{uri: item?.src}}
          style={styles.imageStyle}
          imageStyle={styles.borderRadius12}>
          {selectedItem.includes(item?.id) && (
            <Image source={icon.ic_check} style={styles.iconCheck} />
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderListImage = () => {
    return (
      <View style={styles.flatlistImage}>
        <FlatList
          data={dataImage}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.ctnBody}>
        {renderSearchView()}
        {renderListImage()}
      </View>
    );
  };

  const _onPressSave = () => {
    var listImage = [];
    for (let i = 0; i < (selectedItem || []).length; i++) {
      let dataFilter = dataImage.filter(val => val?.id === selectedItem[i]);
      if (dataFilter.length > 0) {
        listImage.push(dataFilter[0]);
      }
    }
    console.log('listImage: ', listImage);
    setLoading(true);
    setShowNoti(true);
    setDataNoti({
      status: STATUS_NOTIFY.SUCCESS,
      content: 'Successful added',
    });
    setTimeout(() => {
      setDialogSave(false);
      setLoading(false);
      NavigationService.navigate(Routes.GALLERY_SCREEN, {data: listImage});
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header
        textCenter={'Search Image'}
        textRight={'Save'}
        onPressRight={() => {
          setDialogSave(true);
        }}
      />
      {renderBody()}
      {isDialogSave && (
        <DialogView
          onPressCancel={() => setDialogSave(false)}
          content={'Do you want to save these photos in album?'}
          txtlLeft={'Cancel'}
          txtRight={'OK'}
          onPressOK={_onPressSave}
        />
      )}
      {isLoad && <LoadingView />}
      <NotificationView
        isShow={isShowNoti}
        status={dataNoti?.status || STATUS_NOTIFY.ERROR}
        content={dataNoti?.content || ''}
        setShow={val => setShowNoti(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorFFFFFF,
  },
  ctnBody: {
    paddingBottom: 48,
    marginHorizontal: 12,
    marginTop: 20,
  },
  ctnSearchView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginLeft: -35,
  },
  textInputSearch: {
    height: 48,
    borderWidth: 1,
    borderColor: colorDDDEE1,
    borderRadius: 12,
    width: '100%',
    shadowColor: Platform.OS === 'ios' ? '#000' : '#6b6b6b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: colorFFFFFF,
    paddingLeft: 8,
    paddingRight: 35,
  },
  flatlistImage: {
    marginTop: 40,
    alignItems: 'center',
  },
  itemImage: {
    margin: 5,
    flexDirection: 'row',
  },
  imageStyle: {
    height: 100,
    width: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadius12: {
    borderRadius: 12,
  },
  iconCheck: {
    height: 24,
    width: 24,
  },
});
