import Link from 'next/link';
import { FC, useState } from 'react';
import { Add, ExpandMore, Facebook, Instagram, Remove, Twitter } from '@mui/icons-material';
import { Box, Chip, Container, IconButton, MenuItem, styled } from '@mui/material';
import TouchRipple from '@mui/material/ButtonBase';
import { Span } from 'components/Typography';
import { FlexBetween, FlexBox } from 'components/flex-box';
import BazaarMenu from 'components/BazaarMenu';
import { layoutConstant } from 'utils/constants';
import { useRouter } from 'next/router';

// styled component
const TopbarWrapper = styled(Box, {
  shouldForwardProp: (props) => props !== 'bgColor',
})<{ bgColor: string; expand: number }>(({ theme, bgColor, expand }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  color: theme.palette.secondary.contrastText,
  background: bgColor || theme.palette.dark.main,
  transition: 'height 300ms ease',
  '& .menuItem': { minWidth: 100 },
  '& .marginRight': { marginRight: '1.25rem' },
  '& .expand': { display: 'none', padding: 0 },
  '& .handler': { height: layoutConstant.topbarHeight },
  '& .menuTitle': { fontSize: 12, marginLeft: '0.5rem', fontWeight: 600 },

  [theme.breakpoints.down('sm')]: {
    height: expand ? 80 : layoutConstant.topbarHeight,
    '& .topbarRight': { display: expand ? 'flex' : 'none', paddingBottom: 5 },
    '& .expand': { display: 'block', height: layoutConstant.topbarHeight },
    '& .MuiSvgIcon-root': { color: 'white' },
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'start',
    flexDirection: 'column',
  },
}));

// ===========================================
type TopbarProps = { bgColor?: string };
// ===========================================

const Topbar: FC<TopbarProps> = ({ bgColor }) => {
  const router = useRouter();

  const { pathname, asPath, query } = router;

  const [expand, setExpand] = useState<boolean>(false);
  const [language, setLanguage] = useState(router.locale);

  const handleLanguageClick = (lang: string) => () => {
    setLanguage(lang);
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <TopbarWrapper bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center">
            {/* <Chip
              // label="HOT"
              size="small"
              sx={{
                color: 'white',
                fontWeight: 700,
                backgroundColor: 'primary.main',
                '& .MuiChip-label': { pl: '.8rem', pr: '.8rem' },
              }}
            /> */}
            <Span className="title">Free Express Shipping</Span>
          </FlexBox>

          {/* <IconButton disableRipple className="expand" onClick={() => setExpand((state) => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton> */}
          <FlexBox alignItems="center">
            <BazaarMenu
              handler={
                <TouchRipple className="handler marginRight">
                  <Span className="menuTitle">{language.toUpperCase()}</Span>
                  <ExpandMore fontSize="inherit" />
                </TouchRipple>
              }
            >
              {languageList.map((item) => (
                <MenuItem
                  key={item.title}
                  className="menuItem"
                  onClick={handleLanguageClick(item.value)}
                >
                  <Span className="menuTitle">{item.title}</Span>
                </MenuItem>
              ))}
            </BazaarMenu>

            <FlexBox alignItems="center" gap={1.5}>
              {socialLinks.map(({ id, Icon, url }) => (
                <Link href={url} key={id}>
                  <Icon sx={{ fontSize: 16 }} />
                </Link>
              ))}
            </FlexBox>
          </FlexBox>
        </FlexBetween>
      </StyledContainer>
    </TopbarWrapper>
  );
};

const socialLinks = [
  { id: 1, Icon: Twitter, url: '#' },
  { id: 2, Icon: Facebook, url: '#' },
  { id: 3, Icon: Instagram, url: '#' },
];

const languageList = [
  { title: 'RU', value: 'ru' },
  { title: 'EN', value: 'en' },
  { title: 'KG', value: 'kg' },
  { title: 'TR', value: 'tr' },
  { title: 'PL', value: 'pl' },
];

export default Topbar;
