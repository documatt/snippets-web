# TODO: Statcounter is present when `npm run build`ed.

# TODO: Missing VITE_STATCOUNTER_* env variables causes build failure.

from subprocess import Popen, PIPE
import time

import pytest
import requests


sc_code = 'src="https://www.statcounter.com/counter/counter.js"'


# Test should normally finishes in ~2.5 sec, but give it the double time.
@pytest.mark.timeout(5)
def test_sc_not_present_when_in_dev_mode():
    proc = Popen(f"npm run dev -- --port 4371 &", shell=True, text=True, stdout=PIPE)

    # Get the command some time to launch
    time.sleep(2.5)

    html = requests.get("http://localhost:4371").text

    proc.kill()

    assert sc_code not in html