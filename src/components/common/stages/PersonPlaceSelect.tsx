// react
import { useCallback, useEffect, useState } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
// THIS PROJECT
// components
import SelectDialog from '../SelectDialog';
import CustomSelect from '../CustomSelect';
import SelectListItem from '../SelectListItem';
import ShowMoreListItem from '../ShowMoreListItem';
import AddListItem from '../AddListItem';
import AddPersonPlace from './AddPersonPlace';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { getPeoplePlaces as getPeoplePlacesService, getAllPeoplePlaces as getAllPeoplePlacesService } from '../../../services/stages';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface StageSelectProps {
  parent: {
    mounted: React.MutableRefObject<boolean>;
    stage: IdName;
    personPlace: IdName;
    setPersonPlace: Set<IdName>;
  };
  allowAddPersonPlace?: boolean;
  className?: string;
  button?: boolean;
  TextFieldProps?: any;
  ButtonProps?: any;
};
export default function StageSelect(props: StageSelectProps): React.ReactElement {
  const { delay } = useDemoContext();
  const {
    parent,
    allowAddPersonPlace,
    className,
    button,
    TextFieldProps,
    ButtonProps
  } = props;

  const {
    mounted: pMounted,
    stage,
    personPlace,
    setPersonPlace,
  } = parent;

  const mounted = useCheckMounted();

  const [open, setOpen] = useState<boolean>(false);

  const handlePersonPlaceSelect = (personPlacetmp = personPlace) => {
    setPersonPlace(personPlacetmp);
    setOpen(false);
  };

  // get stage specific People/Places
  const [peoplePlaces, setPeoplePlaces] = useState<IdName[]>([]);
  const [getPeoplePlacesStatus, setGetPeoplePlacesStatus] = useState<GetRequestStatus>('loading');

  const getPeoplePlaces = useCallback(async () => {
    setGetPeoplePlacesStatus('loading');
    await delay();
    getPeoplePlacesService(stage.id)
      .then(result => {
        mounted.current && result.data && setPeoplePlaces(result.data);
        mounted.current && setGetPeoplePlacesStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetPeoplePlacesStatus('failed');
        console.error(e);
      });
  },
    [delay, mounted, stage.id]
  );

  useEffect(() => {
    setPersonPlace({ id: '', name: '' });
    if (stage.id) {
      getPeoplePlaces();
    }
  }, [setPersonPlace, getPeoplePlaces, stage.id]);

  // get all People/Places 
  const [allPeoplePlaces, setAllPeoplePlaces] = useState<IdName[]>([]);
  const [getAllPeoplePlacesStatus, setGetAllPeoplePlacesStatus] = useState<GetRequestStatus>('loading');

  const getAllPeoplePlaces = useCallback(async () => {
    setGetAllPeoplePlacesStatus('loading');
    await delay();
    getAllPeoplePlacesService()
      .then(result => {
        mounted.current && result.data && setAllPeoplePlaces(result.data);
        mounted.current && setGetAllPeoplePlacesStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetAllPeoplePlacesStatus('failed');
        console.error(e);
      });

  },
    [delay, mounted]);

  useEffect(() => {
    getAllPeoplePlaces();
  }, [getAllPeoplePlaces]);

  const [showMorePeoplePlaces, setShowMorePeoplePlaces] = useState<boolean>(false);

  const toggleShowMorePeoplePlaces = () => showMorePeoplePlaces ? setShowMorePeoplePlaces(false) : setShowMorePeoplePlaces(true);

  const [addPersonPlace, setAddPersonPlace] = useState<boolean>(false);

  useEffect(() => {
    !open && setAddPersonPlace(false);
    !open && setShowMorePeoplePlaces(false);
  }, [open]);

  let dialogContent: JSX.Element;

  switch (getPeoplePlacesStatus || getAllPeoplePlacesStatus) {
    case 'loading':
      dialogContent = <CircularProgress />;
      break;
    case 'failed':
      dialogContent = <Typography>error loading People/Places</Typography>;
      break;
    default:
      dialogContent = (
        <>
          <Collapse in={!addPersonPlace} timeout='auto' unmountOnExit>
            <List>
              <SelectListItem
                onClick={() => handlePersonPlaceSelect({ id: '', name: '' })}
                textVal=''
                selectCondition={!personPlace.name}
              />
              <Divider />
              {peoplePlaces.map(personPlacetmp =>
                <div key={personPlacetmp.id}>
                  <SelectListItem
                    onClick={() => handlePersonPlaceSelect(personPlacetmp)}
                    textVal={personPlacetmp.name}
                    selectCondition={personPlacetmp.name === personPlace.name}
                  />
                  <Divider />
                </div>)}
              <ShowMoreListItem
                onClick={toggleShowMorePeoplePlaces}
                selectCondition={showMorePeoplePlaces}
              />
              <Collapse in={showMorePeoplePlaces} timeout='auto'>
                {allPeoplePlaces
                  .filter(personPlacetmp => (!peoplePlaces.find(personPlacetmp2 => personPlacetmp2.id === personPlacetmp.id)))
                  .map(personPlacetmp =>
                    <div key={personPlacetmp.id}>
                      <SelectListItem
                        onClick={() => handlePersonPlaceSelect(personPlacetmp)}
                        textVal={personPlacetmp.name}
                        selectCondition={personPlacetmp.name === personPlace.name}
                      />
                    </div>)
                }
                {allowAddPersonPlace &&
                  <AddListItem
                    onClick={() => setAddPersonPlace(true)}
                    textVal={'Add Person/Place'}
                  />}
              </Collapse>
            </List >
          </Collapse>
          {allowAddPersonPlace
            && <AddPersonPlace
              personPlaceSelectParent={{
                mounted: pMounted,
                stageId: stage.id,
                setPersonPlace
              }}
              personPlaceSelect={{
                mounted,
                addPersonPlace,
                setAddPersonPlace,
                setAllPeoplePlaces,
                setPeoplePlaces,
                open,
                setOpen
              }}
            />
          }
        </>
      );
  };

  return (
    <>
      <CustomSelect
        label={button ? 'person/place' : 'Person/Place*'}
        id='person-place-select'
        value={personPlace.name}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
        disabled={stage.id ? false : true}
      />
      <SelectDialog open={open} setOpen={setOpen}
        flex={getPeoplePlacesStatus === 'success' && getAllPeoplePlacesStatus === 'success' ? false : true}>
        {dialogContent}
      </SelectDialog>
    </>
  );
}