from googletrans import Translator

translator = Translator()
translate_text = translator.translate('สวัสดีจีน', lang_tgt='en')
print(translate_text)

text = """
Na dowód swojej tezy przywołuje słowa wiceministra finansów Artura Sobonia. W połowie października polityk w rozmowie z
 Polskim Radiem podkreślił, że na ten moment nie ma tematu skrócenia tygodnia pracy.
– To jest przykład idealnego oderwania od rzeczywistości. Polska gospodarka potrzebuje dzisiaj podniesienia 
produktywności, poniesienia innowacyjności, podniesienia wydajności. Potrzebujemy nadrabiać ten czas, który nam 
ukradziono po drugiej wojnie światowej, tak abyśmy byli społeczeństwem coraz bogatszym, społeczeństwem coraz silniejszym
 – także gospodarczo, także demograficznie, militarnie, kulturowo, tożsamościowo – tłumaczył wiceszef MF na antenie 
 rozgłośni, cytowany przez Polską Agencję Prasową.
Adrian Zandberg przyznaje też, że choć zgodnie z dobrym obyczajem każdy projekt ustawy powinien być poddany pod 
głosowanie, to nie spodziewa się, by marszałek Sejmu wyjęła z sejmowej "zamrażarki" ten dotyczący skrócenia godzin 
pracy. – My w sprawie skrócenia czasu pracy będziemy konsekwentni. Jeśli Razem nie uda się wprowadzić zmian w tym 
parlamencie, to będziemy o to zabiegać w kolejnym – zapowiada poseł w rozmowie z money.pl.
"""
