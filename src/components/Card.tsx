import {styled} from '../theme';

export default styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: ${props => props.theme.palette.card};
  padding: 15px;
  margin: 2px;
`;
