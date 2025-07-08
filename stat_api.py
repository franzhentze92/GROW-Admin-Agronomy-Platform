from flask import Flask, request, jsonify
import numpy as np
from scipy import stats
import statsmodels.api as sm
from statsmodels.stats.multicomp import pairwise_tukeyhsd

app = Flask(__name__)

@app.route('/anova', methods=['POST'])
def anova():
    data = request.json  # expects: {"groups": {"A": [1,2,3], "B": [4,5,6], ...}}
    groups = data['groups']
    group_names = list(groups.keys())
    arrays = [groups[name] for name in group_names]
    # One-way ANOVA
    f_val, p_val = stats.f_oneway(*arrays)
    # Tukey HSD
    all_data = np.concatenate(arrays)
    labels = np.concatenate([[name]*len(groups[name]) for name in group_names])
    tukey = pairwise_tukeyhsd(all_data, labels)
    tukey_results = []
    for res in tukey.summary().data[1:]:
        tukey_results.append({
            "group1": res[0],
            "group2": res[1],
            "meandiff": res[2],
            "p-adj": res[4],
            "lower": res[5],
            "upper": res[6],
            "reject": res[7]
        })
    return jsonify({
        "anova": {"f": f_val, "p": p_val},
        "tukey": tukey_results
    })

if __name__ == '__main__':
    app.run(port=5001)