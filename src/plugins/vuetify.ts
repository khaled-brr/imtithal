import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#B49164',
          secondary: '#B59364',
          gray: '#75797C',
          'light-gray': '#EEEEEE',
          'dark-white': '#F9F9F9',
          'light-white': '#F9F9F9',
          'primary-lighten-1': '#D4B48C',
          'primary-darken-1': '#8C6E4A',
          background: '#F8F7FA',
          surface: '#FFFFFF',
          'surface-variant': '#F5F5F5',
          'on-surface-variant': '#424242',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
      dark: {
        colors: {
          primary: '#B49164',
          secondary: '#22201E',
          'primary-lighten-1': '#D4B48C',
          'primary-darken-1': '#8C6E4A',
          background: '#23282d', // #1E1B17
          surface: '#1E1B17', //#22201E
          'surface-variant': '#2A2826',
          'on-surface-variant': '#E0E0E0'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'lg'
    },
    VTextField: {
      variant: 'solo',
      density: 'comfortable',
      color: 'primary'
    },
    VCard: {
      rounded: 'lg',
      elevation: 0
    }
  },
  rtl: true,
  locale: {
    locale: 'ar',
    fallback: 'ar',
    rtl: {
      ar: true
    },
    messages: {
      ar: {
        close: 'إغلاق',
        dataIterator: {
          noResultsText: 'لم يتم العثور على نتائج',
          loadingText: 'جاري التحميل...'
        },
        dataTable: {
          itemsPerPageText: 'عدد العناصر في الصفحة:',
          sortBy: 'ترتيب حسب'
        },
        fileInput: {
          counter: '{0} ملفات',
          counterSize: '{0} ملفات ({1} في المجموع)'
        },
        timePicker: {
          am: 'ص',
          pm: 'م'
        }
      }
    }
  }
});
