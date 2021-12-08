
import ContactAPI from '../../api/contactAPI';

export const Contact = (contact) => async (dispatch) => {
  try {
    const { data } = await ContactAPI.add(contact);
    dispatch({ type: 'ADD_CONTACT', payload: data });
  } catch (error) {
    console.log(error);
  }
};
