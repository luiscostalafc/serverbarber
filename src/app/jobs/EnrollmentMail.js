//import { format, parseISO } from 'date-fns';
//import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    // each job needs an unique key - usually the class name
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { id } = data;

     //console.log('Queue executed');

    await Mail.sendMail({
      to: `${id.user.name} <${id.user.email}>`,
      subject: 'Bem vindo à Jack Hair & Barber',
      template: 'enrollment',
      context: {
        name: id.name,
      },
    });
  }
}

export default new EnrollmentMail();
