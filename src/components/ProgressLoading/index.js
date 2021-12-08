import { useLayoutEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressLoading = () => {
  useLayoutEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  }, []);
  return null;
};
// class ProgressLoading extends React.Component {
//   // eslint-disable-next-line react/no-deprecated
//   componentWillMount() {
//     nprogress.start();
//   }
//
//   // componentDidMount() {
//   //   nprogress.set(0.7);
//   // }
//
//   componentWillUnmount() {
//     nprogress.done();
//   }
//
//   render() {
//     return null;
//   }
// }

export default ProgressLoading;
